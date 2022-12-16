    
package main
import (
	"bytes"
	"encoding/json"
	"fmt"
	"time"
    "strconv"
    "strings"
    
    "github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/peer"
)

type OrganizationChaincode struct {
}

type Organization struct {
    Id string `json:"Id"`
    Participant_id string `json:"Participant_id"`
    CreatedOn time.Time `json:"CreatedOn"`
    CreatedBy string `json:"CreatedBy"`
    IsDelete bool `json:"IsDelete"`
    BusinessEmail string `json:"BusinessEmail"`
    LicenseKey string `json:"LicenseKey"`
    FirstName string `json:"FirstName"`
    SurName string `json:"SurName"`
    PhoneNumber string `json:"PhoneNumber"`
    CompanyName string `json:"CompanyName"`
    CompanySize string `json:"CompanySize"`
    Country string `json:"Country"`
    State string `json:"State"`
    Notes string `json:"Notes"`
}

func (cc *OrganizationChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {
 
    args := strings.Split(arg[0], "^^")

    if len(args) != 15 {
        return shim.Error("Incorrect number arguments. Expecting 15")
    }
	dateValue2, err2 := time.Parse(time.RFC3339, args[2])

	if err2 != nil {
		return shim.Error("Error converting string to date: " + err2.Error())
	}
	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4  != nil {
		return shim.Error("Error converting string to bool: " + err4.Error())
	}
    data := Organization{ Id: args[0], Participant_id: args[1], CreatedOn: dateValue2, CreatedBy: args[3], IsDelete: boolValue4, BusinessEmail: args[5], LicenseKey: args[6], FirstName: args[7], SurName: args[8], PhoneNumber: args[9], CompanyName: args[10], CompanySize: args[11], Country: args[12], State: args[13], Notes: args[14] }

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

func (cc *OrganizationChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

    if len(args) != 1 {
        return shim.Error("Incorrect number arguments. Expecting 1")
    }

    stateBytes, err := stub.GetState(args[0])

    if err != nil {
        return shim.Error("Error getting the state: " + err.Error())
    }

    return shim.Success(stateBytes)
}
func (cc *OrganizationChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {
    
    args := strings.Split(arg[0], "^^")     

	if len(args) != 15 {
		return shim.Error("Incorrect number arguments. Expecting 15")
	}
	dateValue2, err2 := time.Parse(time.RFC3339, args[2])

	if err2 != nil {
		return shim.Error("Error converting string to date: " + err2.Error())
	}
	boolValue4, err4 := strconv.ParseBool(args[4])

	if err4  != nil {
		return shim.Error("Error converting string to bool: " + err4.Error())
	}
    data := Organization{ Id: args[0], Participant_id: args[1], CreatedOn: dateValue2, CreatedBy: args[3], IsDelete: boolValue4, BusinessEmail: args[5], LicenseKey: args[6], FirstName: args[7], SurName: args[8], PhoneNumber: args[9], CompanyName: args[10], CompanySize: args[11], Country: args[12], State: args[13], Notes: args[14] }

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
func (cc *OrganizationChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := Organization{}

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

func (cc *OrganizationChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *OrganizationChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *OrganizationChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *OrganizationChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "create" { return cc.create(stub, args)
    } else if function == "get" { return cc.get(stub, args)
    } else if function == "update" { return cc.update(stub, args)
    } else if function == "delete" { return cc.delete(stub, args)
    } else if function == "history" { return cc.history(stub, args)
    } else if function == "querystring" { return cc.querystring(stub, args)
    }

	return shim.Error("Invalid invoke function name")
}

func main() {
    var _ = strconv.FormatInt(1234, 10)
    var _ = time.Now()
    var _ = strings.ToUpper("test")
    var _ = bytes.ToUpper([]byte("test"))

	err := shim.Start(new(OrganizationChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
