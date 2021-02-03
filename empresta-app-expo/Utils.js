/**
 * 
 * @param {String} data Data a ser formatada
 */
const formataData = data => `${data}`.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, '$3/$2/$1')

export { formataData }