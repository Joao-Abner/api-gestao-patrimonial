import { Module } from '@nestjs/common';
import { PatrimoniosController } from './patrimonios.controller';
import { PatrimoniosService } from './patrimonios.service';

@Module({
  controllers: [PatrimoniosController],
  providers: [PatrimoniosService]
})
export class PatrimoniosModule {}
