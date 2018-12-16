package com.example.demo;


import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.CouponClientFacade;
import coupon.sys.core.system.ClientType;
import coupon.sys.core.system.CouponSystem;


@Controller
public class LoginServlet {
	CouponClientFacade couponClientFacade = null;
	@RequestMapping(value = "/loginr", method = RequestMethod.POST)
	public  String doPostRedirect(
			// declare parameters sent by the user!
			/*
		<p> NAME : <input name="name" type="text"></p>
		<p> PASSWORD : <input name="pwd" type="password"></p>
		use must call the parameters like the text box name attribute
			 */
				@RequestParam String name, @RequestParam String pwd , @RequestParam ClientType usertype,
				HttpServletRequest request
			) 
	{
//		System.out.println(name);
//		System.out.println(pwd);
//		System.out.println(usertype);
		CouponSystem cs = CouponSystem.getInstance();
		
		try {
			couponClientFacade = cs.login(name, pwd, usertype);
		} catch (CouponSystemException e) {
			return "redirect:http://localhost:8080/login.html";
//			e.printStackTrace();
		}
	
	
		
		
		if (couponClientFacade==null)
		{
			return "redirect:http://localhost:8080/login.html";
		}
		
		// success!
				request.getSession().setAttribute("facade", couponClientFacade);
				
				// now redirect to the correct page!
				switch (usertype)
				{
					case ADMIN:
							return "redirect:http://localhost:8080/admin/index.html";
					case COMPANY:
							return "redirect:http://localhost:8080/company/index.html";
					case CUSTOMER:
							return "redirect:http://localhost:8080/customer/index.html";
				}
				
				return "redirect:http://localhost:8080/login.html";
	}	
	
}
