const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { network, ethers, deployments, getNamedAccounts } = require("hardhat")
const { verify } = require("../utils/verify")

async function main() {
    // const { deploy, log } = deployments
    // const { deployer } = await getNamedAccounts()

    // const waitBlockConfirmations = developmentChains.includes(network.name)
    //     ? 1
    //     : VERIFICATION_BLOCK_CONFIRMATIONS

    // log("----------------------------------------------------")

    // const boxV2 = await deploy("BoxV2", {
    //     from: deployer,
    //     args: [],
    //     log: true,
    //     waitConfirmations: waitBlockConfirmations,
    // })

    // // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(boxV2.address, [])
    // }

    // Upgrade!
    // Not "the hardhat-deploy way"
    // const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    // const transparentProxy = await ethers.getContract("Box_Proxy")
    // const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    // await upgradeTx.wait(1)
    // const proxyBox = await ethers.getContractAt("BoxV2", transparentProxy.address)
    // const version = await proxyBox.version()
    // console.log(`version is now : Version ${version.toString()}`)
    // log("----------------------------------------------------")

    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    const versionV1 = await proxyBoxV1.version()
    console.log(`Version is : ${versionV1}`)

    const boxV2V = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2V.address)
    await upgradeTx.wait(1)
    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const versionV2 = await proxyBoxV2.version()
    console.log(`Version right now is : ${versionV2}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
