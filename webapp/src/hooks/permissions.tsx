// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useAppSelector} from '../store/hooks'
import {getMyBoardMembership, getCurrentBoardId, getBoard} from '../store/boards'
import {getCurrentTeam} from '../store/teams'
import {Permission} from '../constants'
import {MemberRole} from '../blocks/board'

export const useHasPermissions = (teamId: string, boardId: string, permissions: Permission[]): boolean => {
    if (!boardId || !teamId) {
        console.log("!boardId || !teamId false");
        return false
    }

    const member = useAppSelector(getMyBoardMembership(boardId))
    const board = useAppSelector(getBoard(boardId))

    if (!board) {
        console.log("!boardId false");
        return false
    }

    if (!member) {
        console.log("!member false");
        return false
    }

    const adminPermissions = [Permission.ManageBoardType, Permission.DeleteBoard, Permission.ShareBoard, Permission.ManageBoardRoles, Permission.DeleteOthersComments]
    const editorPermissions = [Permission.ManageBoardCards, Permission.ManageBoardProperties]
    const commenterPermissions = [Permission.CommentBoardCards]
    const viewerPermissions = [Permission.ViewBoard]
    for (const permission of permissions) {
        if (adminPermissions.includes(permission) && member.schemeAdmin) {
            console.log("useHasPermissions adminPermissions: TRUE");
            return true
        }
        if (editorPermissions.includes(permission) && (member.schemeAdmin || member.schemeEditor || board.minimumRole === MemberRole.Editor)) {
            console.log("useHasPermissions editorPermissions: TRUE");
            return true
        }
        if (commenterPermissions.includes(permission) && (member.schemeAdmin || member.schemeEditor || member.schemeCommenter || board.minimumRole === MemberRole.Commenter || board.minimumRole === MemberRole.Editor)) {
            console.log("useHasPermissions commenterPermissions: TRUE");
            return true
        }
        if (viewerPermissions.includes(permission) && (member.schemeAdmin || member.schemeEditor || member.schemeCommenter || member.schemeViewer || board.minimumRole === MemberRole.Viewer || board.minimumRole === MemberRole.Commenter || board.minimumRole === MemberRole.Editor)) {
            console.log("useHasPermissions viewerPermissions: TRUE");
            return true
        }
    }
    console.log("useHasPermissions after loop false");
    return false
}

export const useHasPermissionsSearch = (teamId: string, boardId: string, permissions: Permission[]): boolean => {
    if (!boardId || !teamId) {
        console.log("useHasPermissionsSearch !boardId || !teamId false");
        return false
    }

    const member = useAppSelector(getMyBoardMembership(boardId))
    const board = useAppSelector(getBoard(boardId))

    if (!board) {
        console.log("useHasPermissionsSearch !boardId false");
        return false
    }

    if (!member) {
        console.log("useHasPermissionsSearch !member false");
        return false
    }

    const adminPermissions = [Permission.ManageBoardType, Permission.DeleteBoard, Permission.ShareBoard, Permission.ManageBoardRoles, Permission.DeleteOthersComments]
    const editorPermissions = [Permission.ManageBoardCards, Permission.ManageBoardProperties, Permission.ManageBoardRoles]
    const commenterPermissions = [Permission.CommentBoardCards]
    const viewerPermissions = [Permission.ViewBoard]
    for (const permission of permissions) {
        if (adminPermissions.includes(permission) && member.schemeAdmin) {
            console.log("useHasPermissionsSearch adminPermissions: TRUE");
            return true
        }
        if (editorPermissions.includes(permission) && (member.schemeAdmin || member.schemeEditor || board.minimumRole === MemberRole.Editor)) {
            console.log("useHasPermissionsSearch editorPermissions: TRUE");
            return true
        }
        if (commenterPermissions.includes(permission) && (member.schemeAdmin || member.schemeEditor || member.schemeCommenter || board.minimumRole === MemberRole.Commenter || board.minimumRole === MemberRole.Editor)) {
            console.log("useHasPermissionsSearch commenterPermissions: TRUE");
            return true
        }
        if (viewerPermissions.includes(permission) && (member.schemeAdmin || member.schemeEditor || member.schemeCommenter || member.schemeViewer || board.minimumRole === MemberRole.Viewer || board.minimumRole === MemberRole.Commenter || board.minimumRole === MemberRole.Editor)) {
            console.log("useHasPermissionsSearch viewerPermissions: TRUE");
            return true
        }
    }
    console.log("useHasPermissionsSearch after loop false");
    return false
}

export const useHasCurrentTeamPermissions = (boardId: string, permissions: Permission[]): boolean => {
    const currentTeam = useAppSelector(getCurrentTeam)
    return useHasPermissions(currentTeam?.id || '', boardId, permissions)
}

export const useHasCurrentBoardPermissions = (permissions: Permission[]): boolean => {
    const currentBoardId = useAppSelector(getCurrentBoardId)

    return useHasCurrentTeamPermissions(currentBoardId || '', permissions)
}
