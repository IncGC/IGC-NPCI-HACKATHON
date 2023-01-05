package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/peer"
)

type BondHoldingChaincode struct {
}

type BondHolding struct {
	Id             string    `json:"Id"`
	CreatedOn      time.Time `json:"CreatedOn"`
	CreatedBy      string    `json:"CreatedBy"`
	IsDelete       bool      `json:"IsDelete"`
	IsHidden       bool      `json:"IsHidden"`
	IsTokenized    bool      `json:"IsTokenized"`
	IsProcessed    bool      `json:"IsProcessed"`
	Isin           string    `json:"Isin"`
	MbeId          string    `json:"MbeId"`
	IssuerName     string    `json:"IssuerName"`
	CouponRate     string    `json:"CouponRate"`
	FaceValue      string    `json:"FaceValue"`
	Ltp	string `json:"Ltp"`
	CreditRating   string    `json:"CreditRating"`
	MaturityDate   string    `json:"MaturityDate"`
	SecurityDescription  string    `json:"SecurityDescription"`
	Currency string `json:"Currency"`
	LotQty         string    `json:"LotQty"`
	TokenizedLot   string    `json:"TokenizedLot"`
	TotalTokenQty  string    `json:"TotalTokenQty"`
	RemainingToken string    `json:"RemainingToken"`
}

func (cc *BondHoldingChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 21 {
		return shim.Error("Incorrect number arguments. Expecting 21")
	}
	dateValue1, err1 := time.Parse(time.RFC3339, args[1])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}

	boolValue3, err3 := strconv.ParseBool(args[3])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4 != nil {
		return shim.Error("Error converting string to bool: " + err4.Error())
	}
	boolValue5, err5 := strconv.ParseBool(args[5])

	if err5 != nil {
		return shim.Error("Error converting string to bool: " + err5.Error())
	}
	boolValue6, err6 := strconv.ParseBool(args[6])

	if err6 != nil {
		return shim.Error("Error converting string to bool: " + err6.Error())
	}

	data := BondHolding{
		Id:             args[0],
		CreatedOn:      dateValue1,
		CreatedBy:      args[2],
		IsDelete:       boolValue3,
		IsHidden:       boolValue4,
		IsTokenized:    boolValue5,
		IsProcessed:    boolValue6,
		Isin:           args[7],
		MbeId:          args[8],
		IssuerName:     args[9],
		CouponRate:     args[10],
		FaceValue:      args[11],
		Ltp: args[12],
		CreditRating:   args[13],
		MaturityDate:   args[14],
		SecurityDescription:  args[15],
		Currency:       args[16],
		LotQty:         args[17],
		TokenizedLot:   args[18],
		TotalTokenQty:  args[19],
		RemainingToken: args[20],
	}

	dataBytes, errMarshal := json.Marshal(data)

	if errMarshal != nil {
		return shim.Error("Error converting data as bytes: " + errMarshal.Error())
	}

	errPut := stub.PutState(args[0], dataBytes)

	if errPut != nil {
		return shim.Error("Error putting the state: " + errPut.Error())
	}

	return shim.Success(nil)
}

func (cc *BondHoldingChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *BondHoldingChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 21 {
		return shim.Error("Incorrect number arguments. Expecting 21")
	}
	dateValue1, err1 := time.Parse(time.RFC3339, args[1])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}

	boolValue3, err3 := strconv.ParseBool(args[3])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4 != nil {
		return shim.Error("Error converting string to bool: " + err4.Error())
	}
	boolValue5, err5 := strconv.ParseBool(args[5])

	if err5 != nil {
		return shim.Error("Error converting string to bool: " + err5.Error())
	}
	boolValue6, err6 := strconv.ParseBool(args[6])

	if err6 != nil {
		return shim.Error("Error converting string to bool: " + err6.Error())
	}

	data := BondHolding{
		Id:             args[0],
		CreatedOn:      dateValue1,
		CreatedBy:      args[2],
		IsDelete:       boolValue3,
		IsHidden:       boolValue4,
		IsTokenized:    boolValue5,
		IsProcessed:    boolValue6,
		Isin:           args[7],
		MbeId:          args[8],
		IssuerName:     args[9],
		CouponRate:     args[10],
		FaceValue:      args[11],
		Ltp: args[12],
		CreditRating:   args[13],
		MaturityDate:   args[14],
		SecurityDescription:  args[15],
		Currency:       args[16],
		LotQty:         args[17],
		TokenizedLot:   args[18],
		TotalTokenQty:  args[19],
		RemainingToken: args[20],
	}

	dataBytes, errMarshal := json.Marshal(data)

	if errMarshal != nil {
		return shim.Error("Error converting data as bytes: " + errMarshal.Error())
	}

	errPut := stub.PutState(args[0], dataBytes)

	if errPut != nil {
		return shim.Error("Error putting the data state: " + errPut.Error())
	}

	return shim.Success(nil)
}
func (cc *BondHoldingChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := BondHolding{}

	json.Unmarshal(dataBytes, &data)

	data.IsDelete = true

	updateDataBytes, err1 := json.Marshal(data)

	if err1 != nil {
		return shim.Error("Error converting data as bytes: " + err1.Error())
	}

	err2 := stub.PutState(args[0], updateDataBytes)

	if err2 != nil {
		return shim.Error("Error putting the data state: " + err2.Error())
	}

	return shim.Success(nil)
}

func (cc *BondHoldingChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryResult, err := stub.GetHistoryForKey(args[0])

	if err != nil {
		return shim.Error("Error getting history results: " + err.Error())
	}

	var buffer bytes.Buffer
	buffer.WriteString("[")

	isDataAdded := false
	for queryResult.HasNext() {
		queryResponse, err1 := queryResult.Next()
		if err1 != nil {
			return shim.Error(err1.Error())
		}

		if isDataAdded == true {
			buffer.WriteString(",")
		}

		buffer.WriteString(string(queryResponse.Value))

		isDataAdded = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (cc *BondHoldingChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryResult, err := stub.GetQueryResult(args[0])

	if err != nil {
		return shim.Error("Error getting query string results: " + err.Error())
	}

	var buffer bytes.Buffer
	buffer.WriteString("[")

	isDataAdded := false
	for queryResult.HasNext() {
		queryResponse, err1 := queryResult.Next()
		if err1 != nil {
			return shim.Error(err1.Error())
		}

		if isDataAdded == true {
			buffer.WriteString(",")
		}

		buffer.WriteString(string(queryResponse.Value))

		isDataAdded = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}
func (cc *BondHoldingChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *BondHoldingChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "create" {
		return cc.create(stub, args)
	} else if function == "get" {
		return cc.get(stub, args)
	} else if function == "update" {
		return cc.update(stub, args)
	} else if function == "delete" {
		return cc.delete(stub, args)
	} else if function == "history" {
		return cc.history(stub, args)
	} else if function == "querystring" {
		return cc.querystring(stub, args)
	}

	return shim.Error("Invalid invoke function name")
}

func main() {
	var _ = strconv.FormatInt(1234, 12)
	var _ = time.Now()
	var _ = strings.ToUpper("test")
	var _ = bytes.ToUpper([]byte("test"))

	err := shim.Start(new(BondHoldingChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
