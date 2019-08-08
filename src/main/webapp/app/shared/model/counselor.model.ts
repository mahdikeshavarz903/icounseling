import {IPost} from 'app/shared/model/post.model';
import {IDocument} from 'app/shared/model/document.model';
import {ITimeReserved} from 'app/shared/model/time-reserved.model';
import {IPlanning} from 'app/shared/model/planning.model';
import {ICounselingCase} from 'app/shared/model/counseling-case.model';

export const enum ConsultantType {
  PSYCHOLOGY = 'PSYCHOLOGY',
  LEGAL = 'LEGAL',
  FINANCIAL = 'FINANCIAL',
  EDUCATIONAL = 'EDUCATIONAL',
  MEDICAL = 'MEDICAL',
  INDUSTY = 'INDUSTY',
  COMPUTER = 'COMPUTER',
  MUSIC = 'MUSIC',
  ART = 'ART',
  AGRICULTURE = 'AGRICULTURE',
  ANIMAL_HUSBANDRY = 'ANIMAL_HUSBANDRY',
  SPORTS = 'SPORTS',
  RELIGIOUS = 'RELIGIOUS',
  REGISTRATION_OF_DOCUMENTS = 'REGISTRATION_OF_DOCUMENTS'
}

export interface ICounselor {
  id?: number;
  consultantType?: ConsultantType;
  educationId?: number;
  scoreId?: number;
  userId?: number;
  posts?: IPost[];
  documents?: IDocument[];
  timeReserveds?: ITimeReserved[];
  plannings?: IPlanning[];
  counselingCases?: ICounselingCase[];
}

export class Counselor implements ICounselor {
  constructor(
    public id?: number,
    public consultantType?: ConsultantType,
    public educationId?: number,
    public scoreId?: number,
    public userId?: number,
    public posts?: IPost[],
    public documents?: IDocument[],
    public timeReserveds?: ITimeReserved[],
    public plannings?: IPlanning[],
    public counselingCases?: ICounselingCase[]
  ) {}
}
