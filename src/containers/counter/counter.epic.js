import { Observable } from 'rxjs';
import { 
	INCREMENT, 
	PROCESS_INCREMENT, 
	SUCCESS_INCREMENT, 
	ERROR_INCREMENT, 
	DECREMENT
} from './counter.actions';

export class CounterEpic {

	static increment = (action$) => 
		action$.ofType(INCREMENT)
			.mapTo({
				type:PROCESS_INCREMENT,
				isLoading: true,
				message: 'Loading...'
			}).switchMap((result) => {
				return Observable.of({
					type: SUCCESS_INCREMENT,
					isLoading: false,
					message: 'Incremented Successfully!'
				})
			}).catch((error) => {
				return Observable.of({
					type: ERROR_INCREMENT,
					isLoading: false,
					message: 'Increment Failed!'
				})
			})
			

}