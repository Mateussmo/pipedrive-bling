import Deals, { IDealsInterface } from '../schemas/Deals';

class FindAllDealsService {
  public async execute(): Promise<IDealsInterface[]> {
    const dealsFound = await Deals.find();
    return dealsFound;
  }
}

export default FindAllDealsService;
