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

type BondChaincode struct {
}

type Bond struct {
	Id                  string    `json:"Id"`
	CreatedOn           time.Time `json:"CreatedOn"`
	CreatedBy           string    `json:"CreatedBy"`
	IsDelete            bool      `json:"IsDelete"`
	IsHidden            bool      `json:"IsHidden"`
	isin                string    `json:"isin"`
	IssuerName          string    `json:"IssuerName"`
	CouponRate          string    `json:"CouponRate"`
	faceValue           string    `json:"faceValue"`
	Ltp                 string    `json:"Ltp"`
	CreditRating        string    `json:"CreditRating"`
	MaturityDate        string    `json: "MaturityDate"`
	securityDescription string    `json:"securityDescription"`
	latestBidPrice      string    `json:"latestBidPrice"`
	latestAskPrice      string    `json :"latestAskPrice"`
	currency            string    `json :"currency"`
	NumToken            string    `json :"NumToken"`
	Detokenizedtoken    string    `json :"Detokenizedtoken"`
	detokenizedValue    string    `json :"detokenizedValue"`
	tradeValue          string    `json :"tradeValue"`
}

func (cc *BondChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 20 {
		return shim.Error("Incorrect number arguments. Expecting 20")
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

	data := Bond{
		Id:                  args[0],
		CreatedOn:           dateValue1,
		CreatedBy:           args[2],
		IsDelete:            boolValue3,
		IsHidden:            boolValue4,
		isin:                args[5],
		IssuerName:          args[6],
		CouponRate:          args[7],
		faceValue:           args[8],
		Ltp:                 args[9],
		CreditRating:        args[10],
		MaturityDate:        args[11],
		securityDescription: args[12],
		latestBidPrice:      args[13],
		latestAskPrice:      args[14],
		currency:            args[15],
		NumToken:            args[16],
		Detokenizedtoken:    args[17],
		detokenizedValue:    args[18],
		tradeValue:          args[19],
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

func (cc *BondChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *BondChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 20 {
		return shim.Error("Incorrect number arguments. Expecting 20")
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

	data := Bond{
		Id:                  args[0],
		CreatedOn:           dateValue1,
		CreatedBy:           args[2],
		IsDelete:            boolValue3,
		IsHidden:            boolValue4,
		isin:                args[5],
		IssuerName:          args[6],
		CouponRate:          args[7],
		faceValue:           args[8],
		Ltp:                 args[9],
		CreditRating:        args[10],
		MaturityDate:        args[11],
		securityDescription: args[12],
		latestBidPrice:      args[13],
		latestAskPrice:      args[14],
		currency:            args[15],
		NumToken:            args[16],
		Detokenizedtoken:    args[17],
		detokenizedValue:    args[18],
		tradeValue:          args[19],
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
func (cc *BondChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := Bond{}

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

func (cc *BondChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *BondChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *BondChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *BondChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

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

	err := shim.Start(new(BondChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
