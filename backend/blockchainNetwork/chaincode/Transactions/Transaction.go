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

type TransactionsChaincode struct {
}

type Transactions struct {
	Id               string    `json:"Id"`
	CreatedOn        time.Time `json:"CreatedOn"`
	CreatedBy        string    `json:"CreatedBy"`
	IsDelete         bool      `json:"IsDelete"`
	IsHidden         bool      `json:"IsHidden"`
	Isin             string    `json:"Isin"`
	MbeId            string    `json:"MbeId"`
	IssuerName       string    `json:"IssuerName"`
	NumOfToken       string    `json:"NumOfToken"`
	Date             string    `json:"Date"`
	TransactionsType string    `json:"TransactionsType"`
	Status           string    `json:"Status"`
	Amount           string    `json:"Amount"`
	SellOrderId      string    `json:"SellOrderId"`
	BuyOrderId       string    `json:"BuyOrderId"`
	PurchaselogId    string    `json:"PurchaselogId"`
}

func (cc *TransactionsChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 16 {
		return shim.Error("Incorrect number arguments. Expecting 16")
	}
	DateValue1, err1 := time.Parse(time.RFC3339, args[1])

	if err1 != nil {
		return shim.Error("Error converting string to Date: " + err1.Error())
	}
	boolValue3, err3 := strconv.ParseBool(args[3])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4 != nil {
		return shim.Error("Error converting string to bool : " + err4.Error())
	}

	data := Transactions{
		Id:               args[0],
		CreatedOn:        DateValue1,
		CreatedBy:        args[2],
		IsDelete:         boolValue3,
		IsHidden:         boolValue4,
		Isin:             args[5],
		MbeId:            args[6],
		IssuerName:       args[7],
		NumOfToken:       args[8],
		Date:             args[9],
		TransactionsType: args[10],
		Status:           args[11],
		Amount:           args[12],
		SellOrderId:      args[13],
		BuyOrderId:       args[14],
		PurchaselogId:    args[15],
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

func (cc *TransactionsChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *TransactionsChaincode) upDate(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 16 {
		return shim.Error("Incorrect number arguments. Expecting 16")
	}
	DateValue1, err1 := time.Parse(time.RFC3339, args[1])

	if err1 != nil {
		return shim.Error("Error converting string to Date: " + err1.Error())
	}
	boolValue3, err3 := strconv.ParseBool(args[3])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4 != nil {
		return shim.Error("Error converting string to bool : " + err4.Error())
	}

	data := Transactions{
		Id:               args[0],
		CreatedOn:        DateValue1,
		CreatedBy:        args[2],
		IsDelete:         boolValue3,
		IsHidden:         boolValue4,
		Isin:             args[5],
		MbeId:            args[6],
		IssuerName:       args[7],
		NumOfToken:       args[8],
		Date:             args[9],
		TransactionsType: args[10],
		Status:           args[11],
		Amount:           args[12],
		SellOrderId:      args[13],
		BuyOrderId:       args[14],
		PurchaselogId:    args[15],
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
func (cc *TransactionsChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := Transactions{}

	json.Unmarshal(dataBytes, &data)

	data.IsDelete = true

	upDateDataBytes, err1 := json.Marshal(data)

	if err1 != nil {
		return shim.Error("Error converting data as bytes: " + err1.Error())
	}

	err2 := stub.PutState(args[0], upDateDataBytes)

	if err2 != nil {
		return shim.Error("Error putting the data state: " + err2.Error())
	}

	return shim.Success(nil)
}

func (cc *TransactionsChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *TransactionsChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *TransactionsChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *TransactionsChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "create" {
		return cc.create(stub, args)
	} else if function == "get" {
		return cc.get(stub, args)
	} else if function == "upDate" {
		return cc.upDate(stub, args)
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

	err := shim.Start(new(TransactionsChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
