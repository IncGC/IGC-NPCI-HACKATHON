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

type TokenHoldingChaincode struct {
}

type TokenHolding struct {
	Id             string    `json:"Id"`
	CreatedOn      time.Time `json:"CreatedOn"`
	CreatedBy      string    `json:"CreatedBy"`
	IsDelete       bool      `json:"IsDelete"`
	IsHidden       bool      `json:"IsHidden"`
	isin           string    `json:"isin"`
	mbeId          string    `json:"mbeId"`
	IssuerName     string    `json:"IssuerName"`
	CouponRate     string    `json:"CouponRate"`
	faceValue      string    `json:"faceValue"`
	Ltp            string    `json:"Ltp"`
	CreditRating   string    `json:"CreditRating"`
	MaturityDate   string    `json: "MaturityDate"`
	latestBidPrice string    `json:"latestBidPrice"`
	latestAskPrice string    `json :"latestAskPrice"`
	purchasePrice  string    `json :"purchasePrice"`
	NumToken       string    `json :"NumToken"`
	currentPrice   string    `json :"currentPrice"`
	numOfLots      string    `json :"numOfLots"`
}

func (cc *TokenHoldingChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 19 {
		return shim.Error("Incorrect number arguments. Expecting 19")
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

	data := TokenHolding{
		Id:                  args[0],
		CreatedOn:           dateValue1,
		CreatedBy:           args[2],
		IsDelete:            boolValue3,
		IsHidden:            boolValue4,
		isin:                args[5],
		mbeId: args[6],
		IssuerName:          args[7],
		CouponRate:          args[8],
		faceValue:           args[9],
		Ltp:                 args[10],
		CreditRating:        args[11],
		MaturityDate:        args[12],
		latestBidPrice:      args[13],
		latestAskPrice:      args[14],
		purchasePrice:       args[15],
		NumToken:            args[16],
		currentPrice:        args[17],
		numOfLots:           args[18],
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

func (cc *TokenHoldingChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *TokenHoldingChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 19 {
		return shim.Error("Incorrect number arguments. Expecting 19")
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

	data := TokenHolding{
		Id:                  args[0],
		CreatedOn:           dateValue1,
		CreatedBy:           args[2],
		IsDelete:            boolValue3,
		IsHidden:            boolValue4,
		isin:                args[5],
		mbeId: args[6],
		IssuerName:          args[7],
		CouponRate:          args[8],
		faceValue:           args[9],
		Ltp:                 args[10],
		CreditRating:        args[11],
		MaturityDate:        args[12],
		latestBidPrice:      args[13],
		latestAskPrice:      args[14],
		purchasePrice:       args[15],
		NumToken:            args[16],
		currentPrice:        args[17],
		numOfLots:           args[18],
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
func (cc *TokenHoldingChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := TokenHolding{}

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

func (cc *TokenHoldingChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *TokenHoldingChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *TokenHoldingChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *TokenHoldingChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

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

	err := shim.Start(new(TokenHoldingChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}