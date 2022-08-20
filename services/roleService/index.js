const config = require("../../config")

const fetch = require("../../utils/fetch")
const crypto = require("../../utils/crypto")
const RoleSchema = require("../../models/RoleSchema")

const getRolesFromDiscord = async (guildId) => {
    console.log("id", guildId)
    const res = await fetch(`http://discord.com/api/v9/guilds/${guildId}/roles`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${crypto.decrypt(config.token)}`,
        },
    });

    // fetch josn is Promise, we need to use await.
    return await res.json()
}

const getRolesFromDB = async (guildId) => {
    const roles = await RoleSchema.find({
        guildId: guildId
    })
    return roles;
}

const createRole = async (role) => {
    const roleObj = await RoleSchema.create(role);
    await roleObj.save();
    return roleObj;
}

const updateRole = async (roleObj, role) => {
    Object.keys(role).map(key => {
        roleObj[key] = role[key];
    })

    await roleObj.save();
    return role;
}

const findRole = async id => {
    const role = await RoleSchema.findOne({ id: id });
    return role;
}

const addMemberToRole = async (guildId, userId, roleId) => {

    let res;
    try {
        await fetch(`http://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/910263721614512168`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${crypto.decrypt(config.token)}`,
            },
        });
        await fetch(`http://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/913501585705938995`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${crypto.decrypt(config.token)}`,
            },
        });
        await fetch(`http://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/913502012375707698`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${crypto.decrypt(config.token)}`,
            },
        });
        await fetch(`http://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/913503082669830156`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${crypto.decrypt(config.token)}`,
            },
        });
        await fetch(`http://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/913862561508761601`, {
            method: "DELETE",
            headers: {
                Authorization: `Bot ${crypto.decrypt(config.token)}`,
            },
        });
        res = await fetch(`http://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bot ${crypto.decrypt(config.token)}`,
            },
        });
        if (res.status == 204) {
            return true;

        } else {
            return false;
        }
    }
    catch (error) {
        console.log("server-error", error)
        return false;
    }
}

module.exports = {
    getRolesFromDiscord,
    getRolesFromDB,
    createRole,
    updateRole,
    findRole,
    addMemberToRole,
}