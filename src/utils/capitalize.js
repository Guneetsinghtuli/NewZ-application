const capitalize = (str) => {
    return str ? str.slice(0, 1).toUpperCase() + str.slice(1) : "";
};

export default capitalize;
