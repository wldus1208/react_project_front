export const calculateDiscountedPrice = (price, discountPer) => {
    const discountedPrice = price - (price * (discountPer / 100));
    return parseInt(discountedPrice.toFixed(0));
};

export const numberCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
