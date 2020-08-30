export const getNetworkData = (netId: number) => {
  let network: string,
    warning = null
  switch (netId) {
    case 1:
      network = 'Mainnet'
      warning = 'please switch your network to Kovan or Thai Chain'
      break
    case 2:
      network = 'Deprecated Morden'
      warning = 'please switch your network to Kovan or Thai Chain'
      break
    case 3:
      network = 'Ropsten'
      warning = 'please switch your network to Kovan or Thai Chain'
      break
    case 4:
      network = 'Rinkeby'
      break
    case 42:
      network = 'Kovan'
      break
    case 5777:
      network = 'Ganache'
      break
    default:
      network = 'Unknown'
      warning = 'please switch your network to Kovan or Thai Chain'
  }
  return {
    network,
    warning,
  }
}
