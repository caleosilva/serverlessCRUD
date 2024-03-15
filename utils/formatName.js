function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeEachWord(sentence) {
    var words = sentence.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

export function capitalizeNameToProfile(name) {
    var words = name.split(" ");
    if (words.length > 3) {
        var capitalizedString = "";
        capitalizedString += capitalizeFirstLetter(words[0]) + " ";
        for (var i = 1; i < words.length - 1; i++) {
            capitalizedString += words[i].charAt(0).toUpperCase() + ". ";
        }
        capitalizedString += capitalizeFirstLetter(words[words.length - 1]);
        return capitalizedString;
    } else {
        return capitalizeEachWord(name);
    }
}

export function obterIniciais(nomeCompleto) {
    if (typeof nomeCompleto === 'string') {
        const nomes = (nomeCompleto || "").split(" ");

        if (nomes.length >= 2) {
            return nomes.slice(0, 2).map(nome => nome.charAt(0).toUpperCase()).join("");
        } else if (nomes.length === 1) {
            return nomes[0].slice(0, 2).toUpperCase();
        } else {
            return "EU";
        }
    } else {
        return "EU"
    }   
}