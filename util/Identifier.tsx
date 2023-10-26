export default function IdentifierSerialGenerater():string { 
    const uid16 = Date.now().toString(16);
    let result = [];
    for ( let i=0; i<Math.round(uid16.length/4); i++){
        result.push(uid16.substring(4*i,4*(i+1)));
    }
    result = result.map(_=>_.length < 4 ? _.padStart(4,"0") : _);
    return result.join("-");
}