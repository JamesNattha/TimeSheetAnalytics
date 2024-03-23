const defaultValue = (isStatus,data,message) => {
    return {
        isStatus : isStatus,
        data : data,
        message : message
    }
}

module.exports = { defaultValue }