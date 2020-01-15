import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Classes} from './classes.entity';
import {ClassesService} from './classes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Classes]),
    ],
    exports: [ClassesService],
    providers: [
        ClassesService,
    ],
})
export class ClassesModule {
}