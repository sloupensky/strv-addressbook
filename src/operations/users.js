'use strict'

const userRepository = require('../repositories/users')
const errors = require('./../utils/errors')
const logger = require('./../utils/logger')
const crypto = require('./../utils/crypto')

/**
 * Login user and return access informations
 * @param input
 * @returns {Promise<{id: *, accessToken, email: *}>}
 */
async function login(input) {
    logger.info({input}, 'login start')

    const user = await userRepository.findByEmail(input.email.toLowerCase())

    if (!user) {
        throw new errors.UnauthorizedError()
    }
    const verified = await crypto.comparePasswords(input.password, user.password)

    if (!verified || user.disabled) {
        throw new errors.UnauthorizedError()
    }

    const accessToken = await crypto.generateAccessToken(user.id)

    logger.info('login end')

    return {
        id    : user.id,
        email : user.email,
        accessToken,
    }
}

/**
 * Create user with specified input parameters
 * - if user exists return conflict error
 * @param input
 * @returns {Promise<User>}
 */
async function signUp(input) {
    logger.info({input}, 'signUp start')

    const user = {
        name     : input.name,
        email    : input.email.toLowerCase(),
        password : await crypto.hashPassword(input.password),
        disabled : false,
    }

    const existingUser = await userRepository.findByEmail(user.email)

    if (existingUser) {
        throw new errors.ConflictError('User already exists.')
    }

    const createdUser = await userRepository.create(user)
    createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)

    logger.info('signUp end')

    return createdUser
}

/**
 * Verify specified token payload and return user with login timeout
 * @param input
 * @returns {Promise<{loginTimeout: number, user: Promise<User>}>}
 */
async function verifyTokenPayload(input) {
    logger.info({input}, 'verifyTokenPayload')
    const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
    const now = Date.now()
    if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
        throw new errors.UnauthorizedError()
    }

    const userId = parseInt(jwtPayload.userId)
    const user = userRepository.findById(userId)
    if (!user || user.disabled) {
        throw new errors.UnauthorizedError()
    }
    logger.info('verifyTokenPayload')
    return {
        user,
        loginTimeout : jwtPayload.exp * 1000,
    }
}

module.exports = {
    login,
    signUp,
    verifyTokenPayload,
}
