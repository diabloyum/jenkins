
import { pipe } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { environment } from '../../../environments/environment';

export const debug = (message: string) => pipe(
    tap(next => {
            if (!environment.production) {
                console.info(message, next);
            }
        }, error => {
            if (!environment.production) {
                console.error('ERROR>>', message, error);
            }
        },
        () => {
            if (!environment.production) {
                console.info('Completed - ');
            }
        }
    )
);
