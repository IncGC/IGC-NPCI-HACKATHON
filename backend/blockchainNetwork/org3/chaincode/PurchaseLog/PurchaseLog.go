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

type PurchaseLogChaincode struct {
}

type PurchaseLog struct {
	Id          string    `json:"Id"`
	CreatedOn   time.Time `json:"CreatedOn"`
	CreatedBy   string    `json:"CreatedBy"`
	IsDelete    bool      `json:"IsDelete"`
	IsHidden    bool      `json:"IsHidden"`
	IsProcessed bool      `json:"IsProcessed"`
	IsAuthorize bool      `json:"IsAuthorize"`
	IsPurchase  bool      `json:"IsPurchase"`
	MbeId       string    `json:"MbeId"`
	Isin        string    `json:"Isin"`
	Price       string    `json:"Price"`
	NumOfToken  string    `json:"NumOfToken"`
	TradeValue  string    `json:"TradeValue"`
}

func (cc *PurchaseLogChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 13 {
		return shim.Error("Incorrect number arguments. Expecting 13")
	}
	TradeValueValue1, err1 := time.Parse(time.RFC3339, args[1])

	if err1 != nil {
		return shim.Error("Error converting string to TradeValue: " + err1.Error())
	}
	boolValue3, err3 := strconv.ParseBool(args[3])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4 != nil {
		return shim.Error("Error converting string to bool : " + err4.Error())
	}
	boolValue5, err5 := strconv.ParseBool(args[5])

	if err5 != nil {
		return shim.Error("Error converting string to bool : " + err5.Error())
	}

	boolValue6, err6 := strconv.ParseBool(args[6])

	if err6 != nil {
		return shim.Error("Error converting string to bool : " + err6.Error())
	}

	boolValue7, err7 := strconv.ParseBool(args[7])

	if err7 != nil {
		return shim.Error("Error converting string to bool : " + err7.Error())
	}
	data := PurchaseLog{
		Id:          args[0],
		CreatedOn:   TradeValueValue1,
		CreatedBy:   args[2],
		IsDelete:    boolValue3,
		IsHidden:    boolValue4,
		IsProcessed: boolValue5,
		IsAuthorize: boolValue6,
		IsPurchase:  boolValue7,
		MbeId:       args[8],
		Isin:        args[9],
		Price:       args[10],
		NumOfToken:  args[11],
		TradeValue:  args[12],
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

func (cc *PurchaseLogChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *PurchaseLogChaincode) upTradeValue(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 13 {
		return shim.Error("Incorrect number arguments. Expecting 13")
	}
	TradeValueValue1, err1 := time.Parse(time.RFC3339, args[1])

	if err1 != nil {
		return shim.Error("Error converting string to TradeValue: " + err1.Error())
	}
	boolValue3, err3 := strconv.ParseBool(args[3])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4 != nil {
		return shim.Error("Error converting string to bool : " + err4.Error())
	}
	boolValue5, err5 := strconv.ParseBool(args[5])

	if err5 != nil {
		return shim.Error("Error converting string to bool : " + err5.Error())
	}

	boolValue6, err6 := strconv.ParseBool(args[6])

	if err6 != nil {
		return shim.Error("Error converting string to bool : " + err6.Error())
	}

	boolValue7, err7 := strconv.ParseBool(args[7])

	if err7 != nil {
		return shim.Error("Error converting string to bool : " + err7.Error())
	}
	data := PurchaseLog{
		Id:          args[0],
		CreatedOn:   TradeValueValue1,
		CreatedBy:   args[2],
		IsDelete:    boolValue3,
		IsHidden:    boolValue4,
		IsProcessed: boolValue5,
		IsAuthorize: boolValue6,
		IsPurchase:  boolValue7,
		MbeId:       args[8],
		Isin:        args[9],
		Price:       args[10],
		NumOfToken:  args[11],
		TradeValue:  args[12],
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
func (cc *PurchaseLogChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := PurchaseLog{}

	json.Unmarshal(dataBytes, &data)

	data.IsDelete = true

	upTradeValueDataBytes, err1 := json.Marshal(data)

	if err1 != nil {
		return shim.Error("Error converting data as bytes: " + err1.Error())
	}

	err2 := stub.PutState(args[0], upTradeValueDataBytes)

	if err2 != nil {
		return shim.Error("Error putting the data state: " + err2.Error())
	}

	return shim.Success(nil)
}

func (cc *PurchaseLogChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *PurchaseLogChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *PurchaseLogChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *PurchaseLogChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "create" {
		return cc.create(stub, args)
	} else if function == "get" {
		return cc.get(stub, args)
	} else if function == "upTradeValue" {
		return cc.upTradeValue(stub, args)
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

	err := shim.Start(new(PurchaseLogChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
