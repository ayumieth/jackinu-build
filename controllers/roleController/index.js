const roleService = require('../../services/roleService');

const get = async (req, res, next) => {
    let guildId = req.query.guildId
    let roles = await getRoles(guildId)
    res.json({
        roles: roles
    })
}

const modifyRole = async (req, res, next) => {
    const { role } = req.body;
    console.log("modify role", role)

    let roleObj = await roleService.findRole(role.id);
    console.log("roleService.findRole", roleObj)

    if (roleObj !== null)
        roleObj = await roleService.updateRole(roleObj, role);
    else
        roleObj = await roleService.createRole(role);

    let roles = await getRoles(roleObj.guildId)
    res.json({
        roles: roles
    })
}


const buyRole = async (req, res, next) => {
    let { guildId, userId, roleId } = req.body
    let result = await roleService.addMemberToRole(guildId, userId, roleId)
    res.json({
        status: "success",
        result: result
    })
}

const getRoles = async (guildId) => {
    let discordRoles = await roleService.getRolesFromDiscord(guildId)
    let dbRoles = await roleService.getRolesFromDB(guildId)

    let result = [];
    console.log("get discord roles", discordRoles);
    discordRoles.filter((val) => val.name !== '@everyone' && !val.tags).map((val) => {

        if (dbRoles) {
            let dbRole = dbRoles.find(temp => temp.id === val.id)
            if (dbRole) {
                val.price = dbRole.price
            } else {
                val.price = null
            }
        } else {
            val.price = null
        }
        result.push(val)
    })

    console.log("result role", result)
    return result
}

module.exports = {
    get,
    modifyRole,
    buyRole,
}