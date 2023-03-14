
export const DropSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {      
        "Data": {"type": "string"},
        "From": {"type": "string"}        
    }
};


export interface IDropSchema {
    Data ?: string;
    From ?: string;
}