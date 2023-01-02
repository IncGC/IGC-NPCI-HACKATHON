import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  FloatingTree,
  FloatingFocusManager,
  arrow
} from "@floating-ui/react-dom-interactions";

import { mergeRefs } from "react-merge-refs";
import cx from "classnames";

export const MenuItem = forwardRef(({
  label, disabled, className = "", value = "",
  active = "", activeCls = "", ...props
}, ref) => {
  const isActive = value ? value === active : label === active
  return (
    <button
      ref={ref}
      {...props}
      role="menuitem"
      disabled={disabled}
      className={`df DropDownBtn ${className} ${isActive ? `active ${activeCls}` : ""}`}
    >
      {label}
    </button>
  )
})

export const MenuComponent = forwardRef(({
  children, label, rootCls = "", rootActiveCls = "",
  className = "", // className -> nested parent className
  boxCls = "", animeOrigin = '', boxStyle = {},
  placeAt = "", isFixed = false, needArrow = false, arrowCls = "",
  preventClose = false, onClk = () => { }, offsetProps = {}, withHover = true,
  ...props
}, ref) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [allowHover, setAllowHover] = useState(false)
  const [open, setOpen] = useState(false)

  const arrowRef = useRef()
  const listItemsRef = useRef([])
  const listContentRef = useRef(
    Children.map(children, (child) =>
      isValidElement(child) ? child.props.label : null
    )
  )

  const tree = useFloatingTree()
  const nodeId = useFloatingNodeId()
  const parentId = useFloatingParentNodeId()
  const nested = parentId != null

  const {
    x, y, reference, floating, strategy, refs, context, placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 10, alignmentAxis: nested ? -5 : 0, ...offsetProps }),
      flip(),
      shift(),
      arrow({ element: arrowRef })
    ],
    strategy: isFixed ? "fixed" : "absolute",
    placement: placeAt || nested ? "right-start" : "bottom",
    nodeId,
    whileElementsMounted: autoUpdate
  })

  const arrowPlacements = useMemo(() => {
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[placement.split("-")[0]];

    const final = {
      position: strategy,
      left: x != null ? `${arrowX}px` : "",
      top: y != null ? `${arrowY}px` : "",
      [staticSide]: "-6px"
    }

    return final
  }, [placement, strategy, x, y, arrowX, arrowY])

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({ restMs: 25 }),
      // enabled: nested && allowHover,
      enabled: withHover,
      delay: { open: 50 }
    }),
    useClick(context, {
      toggle: !nested,
      pointerDown: true,
      ignoreMouse: nested
    }),
    useRole(context, { role: "menu" }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      nested,
      onNavigate: setActiveIndex
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: open ? setActiveIndex : undefined,
      activeIndex
    })
  ])

  // Event emitter allows you to communicate across tree
  // components.
  // This effect:
  // • Block pointer events of sibling list items while a
  //   nested submenu is open. This prevents other nested
  //   submenus from opening while the pointer traverses
  //   the safe polygon.
  // • Closes all menus when an item gets clicked anywhere
  //   in the tree.
  useEffect(() => {
    function onTreeOpenChange({
      open,
      reference,
      parentId: dataParentId,
      nodeId: dataNodeId
    }) {
      if (dataParentId === nodeId) {
        listItemsRef.current.forEach((item) => {
          if (item && item !== reference) {
            item.style.pointerEvents = open ? "none" : ""
          }
        })
      }

      if (open && dataParentId === parentId && dataNodeId !== nodeId) {
        setOpen(false)
      }
    }

    function onTreeClick() {
      setOpen(false)

      if (parentId === null) {
        refs.reference.current?.focus()
      }
    }

    tree?.events.on("openChange", onTreeOpenChange)
    tree?.events.on("click", onTreeClick)

    return () => {
      tree?.events.off("openChange", onTreeOpenChange)
      tree?.events.off("click", onTreeClick)
    }
  }, [nodeId, open, parentId, tree, refs.reference])

  useEffect(() => {
    tree?.events.emit("openChange", {
      open,
      parentId,
      nodeId,
      reference: refs.reference.current
    })
  }, [nodeId, parentId, open, refs.reference, tree])

  // Determine if "hover" logic can run based on the modality of input. This
  // prevents unwanted focus synchronization as menus open and close with
  // keyboard navigation and the cursor is resting on the menu.
  useEffect(() => {
    function onPointerMove() {
      setAllowHover(true)
    }

    function onKeyDown() {
      setAllowHover(false)
    }

    window.addEventListener("pointermove", onPointerMove, {
      once: true,
      capture: true
    })
    window.addEventListener("keydown", onKeyDown, true)

    return () => {
      window.removeEventListener("pointermove", onPointerMove, {
        capture: true
      })
      window.removeEventListener("keydown", onKeyDown, true)
    }
  }, [allowHover])

  const mergedReferenceRef = useMemo(() => mergeRefs([ref, reference]), [
    reference,
    ref
  ])

  return (
    <FloatingNode id={nodeId}>
      <button
        {...getReferenceProps({
          ...props,
          ref: mergedReferenceRef,
          onClick: ({ currentTarget }) =>
            currentTarget.focus(),
          onMouseEnter: ({ currentTarget }) => {
            if (!nested) {
              currentTarget.focus()
            }
          },
          ...(nested
            ? {
              role: "menuitem",
              className: cx("df DropDownBtn", className, { "bg-slate-200": open }),
              onKeyDown(e) {
                // Prevent more than one menu from being open.
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  setOpen(false)
                }
              }
            }
            : {
              role: "menu",
              className: `df focus:outline-0 ${rootCls} ${open ? rootActiveCls : ""}`
            })
        })}
      >
        {label}
        {/* {nested && <span className="ml-3">➔</span>} */}
      </button>

      <FloatingPortal>
        {
          open &&
          <FloatingFocusManager
            preventTabbing
            context={context}
            modal={!nested}
          >
            <div
              {...getFloatingProps({
                className: cx("dfc DropDownBox animate-scale", boxCls, animeOrigin, {
                  "origin-top": !animeOrigin && !nested,
                  "origin-top-left": !animeOrigin && nested,
                }),
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? "",
                  left: x ?? "",
                  ...boxStyle
                }
              })}
            >
              {Children.map(
                children,
                (child, index) =>
                  isValidElement(child) &&
                  cloneElement(
                    child,
                    getItemProps({
                      ref(node) {
                        listItemsRef.current[index] = node
                      },
                      onClick() {
                        onClk(typeof child.props.label === "string" ? child?.props?.label : child?.props?.value)
                        if (!preventClose) {
                          tree?.events?.emit("click")
                        }
                      },
                      // By default `focusItemOnHover` uses `pointermove` sync,
                      // but when a menu closes we want this to sync it on
                      // `enter` even if the cursor didn't move.
                      onPointerEnter() {
                        if (allowHover) {
                          setActiveIndex(index)
                        }
                      }
                    })
                  )
              )}

              {
                needArrow &&
                <div
                  ref={arrowRef}
                  style={{ ...arrowPlacements }}
                  className={`DropDownArrow ${arrowCls}`}
                ></div>
              }
            </div>
          </FloatingFocusManager>
        }
      </FloatingPortal>
    </FloatingNode>
  )
})

export const Menu = forwardRef((props, ref) => {
  const parentId = useFloatingParentNodeId()

  if (!parentId) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    )
  }

  return <MenuComponent {...props} ref={ref} />
})

export const DropDownWrapper = forwardRef(({
  children, list = [], onClk, btnCls = "",
  active = "", activeCls = "", ...otherProps
}, ref) => {
  return (
    <Menu
      ref={ref}
      label={children}
      onClk={onClk}
      {...otherProps}
    >
      {
        list.map(l => {
          if (typeof l !== "string" && l.list) {
            return (
              <DropDownWrapper
                key={l.value}
                onClk={onClk}
                active={active}
                activeCls={activeCls}
                {...l}
              >
                {l.label}
              </DropDownWrapper>
            )
          }

          if (typeof l !== "string" && l.isSpecial) {
            return (
              <l.Comp
                key={l.value}
                onClk={onClk}
                active={active}
                activeCls={activeCls}
                {...l}
              />
            )
          }

          if (typeof l === "string") {
            return (
              <MenuItem
                key={l}
                label={l}
                className={btnCls}
                active={active}
                activeCls={activeCls}
              />
            )
          }

          return (
            <MenuItem
              key={l.value}
              active={active}
              activeCls={activeCls}
              {...l}
            />
          )
        })
      }
    </Menu>
  )
})