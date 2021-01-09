import Deals from '../schemas/Deals';

interface IResponseDTO {
  success: boolean;
  data: any;
  additional_data: any;
  related_objects: any;
}

class SaveDealsService {
  public async execute(deals: any): Promise<void> {
    const dealsFound = await Deals.findOne({ date: deals.data });

    if (!dealsFound) {
      await Deals.create({
        clientName: deals.cliente.nome,
        total: deals.itens.reduce(
          (total: any, value: any) => total + value.vlr_unit,
          0,
        ),
        date: deals.data,
        itens: deals.itens,
      });
    } else if (dealsFound.date === deals.data) {
      dealsFound.total = deals.itens.reduce(
        (total: any, value: any) => total + value.vlr_unit,
        0,
      );

      dealsFound.itens = [...deals.itens];
      await dealsFound.save();
    }
  }
}

export default SaveDealsService;
