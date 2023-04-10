export const isTournamentNameValid = (name: string) => {
    const regex = /^[a-zA-Z0-9 ]*\S$/gm
    return regex.test(name)
}