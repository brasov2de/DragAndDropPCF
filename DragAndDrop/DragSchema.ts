
export const DropDataSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {      
        "Data": {"type": "string"},
        "From": {"type": "string"}        
    }
};


export interface IDropDataSchema {
    Data ?: string;
    From ?: string;
}