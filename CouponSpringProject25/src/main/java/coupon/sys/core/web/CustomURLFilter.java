package coupon.sys.core.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.derby.iapi.types.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import coupon.sys.core.facade.AdminFacade;
import coupon.sys.core.facade.CompanyFacade;
import coupon.sys.core.facade.CustomerFacade;
import coupon.sys.core.system.ClientType;


public class CustomURLFilter implements Filter{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomURLFilter.class);


	 @Override
	 public void init(FilterConfig filterConfig) throws ServletException {
	  LOGGER.info("########## Initiating CustomURLFilter filter ##########");
	 }


	 @Override
	 public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

	  HttpServletRequest request = (HttpServletRequest) servletRequest;
	  HttpServletResponse response = (HttpServletResponse) servletResponse;

	  LOGGER.info("This Filter is only called when request is mapped for /customer /admin /company resource");

	
	
//	if (request.getSession().getAttribute("facade")==null) {
//		  response.sendRedirect("http://localhost:8080");
//	}

	  System.out.println("I am from filter");
	
//	 System.out.println(request.getSession().getAttribute("UT"));
	 
	 
	 System.out.println(request.getAttribute("usertype")); // WHY THIS NOT WORKING?!?!?! WHY ITS NULL?!!!!?
	
	if (request.getSession().getAttribute("facade") instanceof AdminFacade && request.getSession().getAttribute("UT").toString().equals("ADMIN")) {
		System.out.println("I am instance of AdminFacade");
		  filterChain.doFilter(request, response);
	}else
	if (request.getSession().getAttribute("facade") instanceof CompanyFacade && request.getSession().getAttribute("UT").toString().equals("COMPANY")) {
		System.out.println("I am instance of CompanyFacade");
		  filterChain.doFilter(request, response);
	}else
	if (request.getSession().getAttribute("facade") instanceof CustomerFacade && request.getSession().getAttribute("UT").toString().equals("CUSTOMER")) {
		System.out.println("I am instance of CustomerFacade");
		  filterChain.doFilter(request, response);
	}else{		
		System.out.println("I am not instance of any Facade or not facade at all :)");
		response.sendRedirect("http://localhost:8080");
	}
	
	

	  
	  
	 }

	 @Override
	 public void destroy() {

	 }
	}