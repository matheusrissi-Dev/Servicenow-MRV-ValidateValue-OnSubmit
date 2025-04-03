function onSubmit() {
    var mrvsName = "elemento_oficinas"; // Nome da MRVS no ServiceNow
    var fieldToCheck = "solicitud"; // Nome do campo dentro da MRVS que queremos capturar

    // Obtém os dados da MRVS (vem como JSON string)
    var mrvsData = g_form.getValue(mrvsName);

    if (!mrvsData) {
        g_form.addErrorMessage("A Multi-Row Variable Set está vazia.");
        return false; // Impede o envio
    }

    try {
        var parsedData = JSON.parse(mrvsData);
        var values = [];

        // Percorre todas as linhas da MRVS
        for (var i = 0; i < parsedData.length; i++) {
            var fieldValue = parsedData[i][fieldToCheck]; // Captura o valor do campo específico
            values.push(fieldValue);
        }

        //g_form.addInfoMessage("Valores capturados: " + values.join(", ").toString());
        var optionsString = values.join(", ").toString();
        var optionsArray = optionsString.split(/\s*,\s*/); // Remove espaços ao redor da vírgula
        var verifySellosOdicina = optionsArray.indexOf("sellos_oficina") !== -1;

        if (verifySellosOdicina) {
            if (this.document.getElementsByClassName('get-attachment').length == 0) {
                g_form.addErrorMessage(getMessage('Mandatory attachment'));
                return false;
            }
            return true;
        }
    } catch (e) {
        g_form.addErrorMessage("Error interpreting MRVS data.");
        return false; // Impede o envio
    }
}