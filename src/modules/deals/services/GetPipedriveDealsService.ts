import axios from 'axios';

interface IResponseDTO {
  success: boolean;
  data: any;
  additional_data: any;
  related_objects: any;
}

class GetPipedriveDealsService {
  public async execute(): Promise<IResponseDTO> {
    const { data } = await axios.get(
      `https://${process.env.PIPEDRIVE_USER}.pipedrive.com/api/v1/deals?status=won&api_token=${process.env.PIPEDRIVE_TOKEN}`,
    );
    return data;
  }
}

export default GetPipedriveDealsService;
