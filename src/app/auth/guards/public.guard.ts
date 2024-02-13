import { Observable, map, tap } from "rxjs";
import { AutheService } from "../services/auth.service";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { inject } from "@angular/core";

/**
 * El objetivo de esta constante es comprobar si el usuario esta autentificado, si
 * lo esta no le deja pasar al login
 * @returns Un Observable que emite un valor booleano indicando si el usuario está autentificado.
 */
const checkAuthStatus = (): Observable<boolean> => {
  const authService: AutheService = inject(AutheService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated)),
    tap( isAuthenticated => {
      if( isAuthenticated ){
        router.navigate(['/heroes'])// Redirige al usuario a la ruta '/heroes' si está autentificado
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  )
}

/**
 * Este guard se utiliza para comprobar si la ruta puede ser emparejada.
 * @param route La ruta actual.
 * @param segments Los segmentos de la URL.
 * @returns Un Observable que emite un valor booleano indicando si la ruta puede ser emparejada.
 */
export const cantMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log(`CanMatch`)
  console.log({ route, segments })

  return checkAuthStatus();
}
