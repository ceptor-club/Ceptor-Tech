function RandomName() {

    let ranPart1 = Math.floor(Math.random() * 18) + 1;
    let ranPart2 = Math.floor(Math.random() * 9) + 1;
    let ranPart3 = Math.floor(Math.random() * 7) + 1;

    let part1 = "";
    let part2 = "";
    let part3 = "";

    //First Part of Name
    switch (ranPart1) {
        case 1:
            part1 = "Tom"
            break
        case 2:
            part1 = "Gor"
            break
        case 3:
            part1 = "Sam"
            break
        case 4:
            part1 = "Dor"
            break
        case 5:
            part1 = "Ban"
            break
        case 6:
            part1 = "Ar"
            break
        case 7:
            part1 = "Bong"
            break
        case 8:
            part1 = "Ram"
            break
        case 9:
            part1 = "Pang"
            break
        case 10:
            part1 = "Zap"
            break
        case 11:
            part1 = "Jay"
            break
        case 12:
            part1 = "Garg"
            break
        case 13:
            part1 = "Quar"
            break
        case 14:
            part1 = "Qyn"
            break
        case 15:
            part1 = "Foon"
            break
        case 16:
            part1 = "Flyn"
            break
        case 17:
            part1 = "Van"
            break
        default:
            part1 = "Von"
    }

    //Second Part of Name
    switch (ranPart2) {
        case 1:
            part2 = "lin"
            break
        case 2:
            part2 = "an"
            break
        case 3:
            part2 = "ing"
            break
        case 4:
            part2 = "un"
            break
        case 5:
            part2 = "on"
            break
        case 6:
            part2 = "ort"
            break
        case 7:
            part2 = "art"
            break
        case 8:
            part2 = "ar"
            break
        default:
            part2 = "er"
    }

    //Third Part of Name
    switch (ranPart3) {
        case 1:
            part3 = ""
            break
        case 2:
            part3 = "eus"
            break
        case 3:
            part3 = "o"
            break
        case 4:
            part3 = "ite"
            break
        case 5:
            part3 = "ing"
            break
        case 6:
            part3 = "ang"
            break
        default:
            part3 = ""
    }

    //Put it all together
    let randomName = part1 + part2 + part3
    return randomName

}

module.exports = { RandomName }