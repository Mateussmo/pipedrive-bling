import axios from 'axios';
import AppError from '../../../shared/errors/AppError';

class PostBlingDealsService {
  public async execute(xml: string): Promise<void> {
    const { data } = await axios.post(
      `https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`,
    );

    if (!data.retorno.pedidos && data.retorno.erros[0].erro.cod === 30) {
      throw new AppError(
        'We have identified that there is already a product (s) for the same order, if you want to include new products for that order. Please delete the order in bling!',
      );
    }
  }
}

export default PostBlingDealsService;
