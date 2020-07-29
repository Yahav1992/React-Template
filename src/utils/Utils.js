export const parseDuration = (dur) => {
    const PT = dur.split("PT");
    const DT = PT[1].split("DT");
    const H = DT[0].split("H");
    const M = H[0].split("M");
    let stringDuration = H.length > 1 ? H[0] + " Hours" : "";
    stringDuration = stringDuration + ((M.length > 1 && stringDuration) ? " And " + M[0] + " Minutes" : M.length > 1 ? M[0] + " Minutes" : "");
    return stringDuration;
}