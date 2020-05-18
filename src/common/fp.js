export function h0(timeStap = Date.now()) {
    const target = new Date(timeStap);

    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);

    return target.getTime();
}