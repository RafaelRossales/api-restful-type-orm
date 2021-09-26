import handlebars from 'handlebars'



//Utilizando quando nao sabemos os tipos ou quantidade de variaveis
interface ItemplateVariable{
  [key:string]:string | number;
}

interface IParseMailTemplate{
  template:string,
  variables:ItemplateVariable;
}

/**
 *@description - Criação de template para envio de email
 */
export default class handlebarsEmailTemplate{

  public async parse({
    template,
    variables
  }:IParseMailTemplate):Promise<string>{

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);

  }
}
