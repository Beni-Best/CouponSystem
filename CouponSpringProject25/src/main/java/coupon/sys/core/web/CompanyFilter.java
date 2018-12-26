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

import org.springframework.stereotype.Component;


import coupon.sys.core.facade.CompanyFacade;

/**
 * Filter that used to redirect people who try to get to company SPA without login
 *
 */
public class CompanyFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	/**
	 * 
	 * Redirect to login page if some one try to get to /company/* url and facade == null or facade is not instance of CompanyFacade
	 * 
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse res = (HttpServletResponse)response; 
		if (req.getSession().getAttribute("facade")==null || !(req.getSession().getAttribute("facade") instanceof CompanyFacade)) {
			res.sendRedirect("http://localhost:8080");
		}else {
			chain.doFilter(request, response);
		}
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
