import { Request, Response } from 'express';
import GetPipedriveDealsService from '../services/GetPipedriveDealsService';
import PostBlingDealsService from '../services/PostBlingDealsService';
import SaveDealsService from '../services/SaveDealsService';
import FindAllDealsService from '../services/FindAllDealsService';

const js2xmlparser = require('js2xmlparser');

class DealsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const getPipedriveDeals = new GetPipedriveDealsService();
    const postBlingDeals = new PostBlingDealsService();
    const saveDeals = new SaveDealsService();

    const pipedriveDeals = await getPipedriveDeals.execute();

    const deals = pipedriveDeals.data.reduce((dealsTreated: any, deal: any) => {
      return {
        ...dealsTreated,
        cliente: { nome: deal.person_id.name.replace(/[^\w\s]/gi, '') },
        data: deal.add_time
          .split(' ')[0]
          .replace(/-/g, '/')
          .split('/')
          .reverse()
          .join('/'),
        itens: pipedriveDeals.data.map((item: any) => ({
          item: {
            codigo: item.id,
            descricao: item.title.replace(/[^\w\s]/gi, ''),
            qtde: '1',
            vlr_unit: item.value,
          },
        })),
      };
    }, {});

    const xml = js2xmlparser.parse('pedido', deals);

    await postBlingDeals.execute(xml);

    const itens = deals.itens.map((order: any) => ({
      codigo: order.item.codigo,
      descricao: order.item.descricao,
      qtde: '1',
      vlr_unit: order.item.vlr_unit,
    }));

    deals.itens = [...itens];

    await saveDeals.execute(deals);

    return response.status(201).json({ message: 'Successfully created!' });
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllDeals = new FindAllDealsService();
    const deals = await findAllDeals.execute();
    return response.status(200).json({ deals: 'test' });
  }
}

export default DealsController;
