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
	Id                  string    `json:"id"`
	CreatedOn           time.Time `json:"createdOn"`
	CreatedBy           string    `json:"createdBy"`
	IsDelete            bool      `json:"isDelete"`
	IsHidden            bool      `json:"isHidden"`
	Isin                string    `json:"isin"`
	IssuerName          string    `json:"issuerName"`
	CouponRate          string    `json:"couponRate"`
	FaceValue           string    `json:"faceValue"`
	Ltp                 string    `json:"ltp"`
	CreditRating        string    `json:"creditRating"`
	MaturityDate        string    `json: "maturityDate"`
	SecurityDescription string    `json:"securityDescription"`
	LatestBidPrice      string    `json:"latestBidPrice"`
	LatestAskPrice      string    `json :"latestAskPrice"`
	Currency            string    `json :"currency"`
	NumToken            string    `json :"numToken"`
	Detokenizedtoken    string    `json :"detokenizedtoken"`
	DetokenizedValue    string    `json :"detokenizedValue"`
	TradeValue          string    `json :"tradeValue"`
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
		Isin:                args[5],
		IssuerName:          args[6],
		CouponRate:          args[7],
		FaceValue:           args[8],
		Ltp:                 args[9],
		CreditRating:        args[10],
		MaturityDate:        args[11],
		SecurityDescription: args[12],
		LatestBidPrice:      args[13],
		LatestAskPrice:      args[14],
		Currency:            args[15],
		NumToken:            args[16],
		Detokenizedtoken:    args[17],
		DetokenizedValue:    args[18],
		TradeValue:          args[19],
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
		Isin:                args[5],
		IssuerName:          args[6],
		CouponRate:          args[7],
		FaceValue:           args[8],
		Ltp:                 args[9],
		CreditRating:        args[10],
		MaturityDate:        args[11],
		SecurityDescription: args[12],
		LatestBidPrice:      args[13],
		LatestAskPrice:      args[14],
		Currency:            args[15],
		NumToken:            args[16],
		Detokenizedtoken:    args[17],
		DetokenizedValue:    args[18],
		TradeValue:          args[19],
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
