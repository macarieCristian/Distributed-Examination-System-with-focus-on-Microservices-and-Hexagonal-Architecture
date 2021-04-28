export interface GetConsumerAvailableExamHeaderDto {
  uuid: string;
  ownerUuid: string;
  title: string;
  description: string;
  duration: number;
  available: boolean;
}
