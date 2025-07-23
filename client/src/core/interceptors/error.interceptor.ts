import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            }
            
            else {
              toast.error(error.error, error.status.toString());
            }
            break;
          case 401:
            toast.error(error.error);
            break;
          case 404:
            toast.error('Not found');
            break;
          case 500:
            toast.error('Server error');
            break;
          default:
            toast.error('Something unexpected went wrong');
            break;
        }
      }
      return throwError(() => error); 
    })
  );
};
