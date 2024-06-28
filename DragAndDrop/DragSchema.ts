
export const DropDataSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {      
        "Data": {"type": "string"},
        "From": {"type": "string"}, 
        "ClientX": {"type": "number"},
        "ClientY": {"type": "number"}, 
        "MovementX": {"type": "number"},
        "MovementY": {"type": "number"},
    }
};


export interface IDropDataSchema {
    Data ?: string;
    From ?: string;
    "ClientX" ?: number;
    "ClientY" ?: number;
    "MovementX" ?: number;
    "MovementY" ?: number;
}