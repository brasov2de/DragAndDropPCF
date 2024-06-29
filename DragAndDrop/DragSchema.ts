
export const DropDataSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {      
        "Data": {"type": "string"},
        "From": {"type": "string"}, 
        "X": {"type": "number"},
        "Y": {"type": "number"}
    }
};


export interface IDropDataSchema {
    Data ?: string;
    From ?: string;
    "X" ?: number;
    "Y" ?: number;
}