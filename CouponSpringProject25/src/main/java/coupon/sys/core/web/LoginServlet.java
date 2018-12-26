package coupon.sys.core.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.CouponClientFacade;
import coupon.sys.core.system.ClientType;
import coupon.sys.core.system.CouponSystem;

/**
 * Login , Checks if User Name , Password and User Type currect. If currect
 * redirect to the relevant page and set relevant facade to session
 * 
 *
 */
@Controller
public class LoginServlet {
	CouponClientFacade couponClientFacade = null;

	@RequestMapping(value = "/loginr", method = RequestMethod.POST)
	public String doPostRedirect(@RequestParam String name, @RequestParam String pwd, @RequestParam ClientType usertype,
			HttpServletRequest request, HttpServletResponse response) {

		CouponSystem cs = CouponSystem.getInstance();

		try {
			couponClientFacade = cs.login(name, pwd, usertype);

			if (couponClientFacade == null) {
				return "redirect:http://localhost:8080";
			}

			// success!

			request.getSession().setAttribute("facade", couponClientFacade);

			// now redirect to the correct page!
			switch (usertype) {
			case ADMIN:
				return "redirect:http://localhost:8080/admin/index.html";
			case COMPANY:
				return "redirect:http://localhost:8080/company/index.html";
			case CUSTOMER:
				return "redirect:http://localhost:8080/customer/index.html";
			}

			return "redirect:http://localhost:8080";
		} catch (CouponSystemException e) {	
			e.printStackTrace();
		}
		return "redirect:http://localhost:8080";
	}

}
