import fs from 'fs';
import handlebars from 'handlebars'

//Utilizando quando nao sabemos os tipos ou quantidade de variaveis
interface ItemplateVariable{
  [key:string]:string | number;
}

interface IParseMailTemplate{
  file:string,
  variables:ItemplateVariable;
}

/**
 *@description - Criação de template para envio de email
 */
export default class HandlebarsMailTemplate{

  public async parse({
    file,
    variables
  }:IParseMailTemplate):Promise<string>{

    const templateFileContent = await fs.promises.readFile(file,{
      encoding:'utf-8'
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);

  }
}
