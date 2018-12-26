package coupon.sys.core.web;

import java.io.Console;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.net.SyslogOutputStream;
import coupon.sys.core.beans.Company;
import coupon.sys.core.beans.Coupon;
import coupon.sys.core.beans.CouponType;
import coupon.sys.core.dao.db.CompanyDaoDb;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.CompanyFacade;
import coupon.sys.core.system.ClientType;
import coupon.sys.core.system.CouponSystem;

/**
 * 
 * Company REST web service
 *
 */
@RestController
@CrossOrigin("*")
public class CompanyWS {

	

	private CompanyFacade getFacade(HttpServletRequest request) throws CouponSystemException  {
		
		
		CompanyFacade cf = (CompanyFacade)request.getSession().getAttribute("facade");
		return cf;

	}
	
	/**
	 * This method closes the session
	 * @param request
	 */
	@RequestMapping(value= "company/logout" , method=RequestMethod.POST)
	public void logout (HttpServletRequest request, HttpServletResponse resp){
		System.out.println("hello");
		HttpSession session =request.getSession(false);
		if (request.isRequestedSessionIdValid() && session!=null) {
			session.invalidate();
		}
		Cookie [] cookies = request.getCookies();
		for (Cookie cookie : cookies) {
			cookie.setMaxAge(0);
			cookie.setValue(null);
			cookie.setPath("/");
			resp.addCookie(cookie);
		}
	}

	/**
	 * 
	 * @param request
	 * @return all coupons of the company that get the current facade.
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/getallcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCoupons(HttpServletRequest request) throws CouponSystemException {
		Collection<Coupon> coupons = new ArrayList<>();


			CompanyFacade compFac = getFacade(request);
			coupons = compFac.getAllCoupons();

		return coupons;
	}

	/**
	 * create coupon in the database
	 * 
	 * @param request
	 * @param coup
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/createcoupon", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public  @ResponseBody ResponseEntity<String> createCoupon(HttpServletRequest request ,@RequestBody Coupon coup) throws CouponSystemException {
		
		try {
			CompanyFacade companyFacade = getFacade(request);

			java.util.Date ed = coup.getEnd_Date();
			java.util.Date sd = coup.getStart_Date();
			coup.setEnd_Date(new java.sql.Date(ed.getTime()));
			coup.setStart_Date(new java.sql.Date(sd.getTime()));

			companyFacade.createCoupon(coup);
			return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.TEXT_PLAIN).body("ok");
		} catch (CouponSystemException e) {
			// TODO: handle exception
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body(e.getMessage());
		}
			
	}

	/**
	 * remove coupon from database
	 * 
	 * @param request
	 * @param coup
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/removecoupon", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> removeCoupon(HttpServletRequest request,@RequestBody Coupon coup) throws CouponSystemException {
try {
	CompanyFacade companyFacade = getFacade(request);
	companyFacade.removeCoupon(coup);
	return  ResponseEntity.status(HttpStatus.ACCEPTED).contentType(MediaType.TEXT_PLAIN).body("ok");
} catch (CouponSystemException e) {
	// TODO: handle exception
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body(e.getMessage());
}
			
	}
	
	/**
	 * remove company by id
	 * 
	 * @param request
	 * @param coup
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/removecouponbyid", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> removeCouponById(HttpServletRequest request,@RequestBody Coupon coup) throws CouponSystemException {
		try {
			CompanyFacade companyFacade = getFacade(request);
			companyFacade.removeCouponById(coup);
			return  ResponseEntity.status(HttpStatus.ACCEPTED).contentType(MediaType.TEXT_PLAIN).body("ok");
		} catch (CouponSystemException e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body(e.getMessage());
		}
	}

	/**
	 * update coupon in the database
	 * 
	 * @param request
	 * @param coup
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/updatecoupon", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public  @ResponseBody ResponseEntity<String> updateCoupon(HttpServletRequest request,@RequestBody Coupon coup) throws CouponSystemException {
		try {
			System.out.println(coup);
			java.util.Date ed = coup.getEnd_Date();
			java.util.Date sd = coup.getStart_Date();
			coup.setEnd_Date(new java.sql.Date(ed.getTime()));
			coup.setStart_Date(new java.sql.Date(sd.getTime()));

			CompanyFacade companyFacade = getFacade(request);
			companyFacade.updateCoupon(coup);
			
			return  ResponseEntity.status(HttpStatus.ACCEPTED).contentType(MediaType.TEXT_PLAIN).body("ok");
		} catch (CouponSystemException e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body(e.getMessage());
		}
	}

	/**
	 * get coupon by id
	 * 
	 * @param request
	 * @param coupId
	 * @return coupon and relevant status 
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/getcoupon/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCouponById(HttpServletRequest request,@PathVariable("id") int coupId) throws CouponSystemException {
	try {
		CompanyFacade companyFacade = getFacade(request);
		Coupon coup = new Coupon();
		coup = companyFacade.getCouponById(coupId);
		return ResponseEntity.status(HttpStatus.OK).body(coup);
	} catch (CouponSystemException e) {
		// TODO: handle exception
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).contentType(MediaType.TEXT_PLAIN).body(e.getMessage());
	}
			
		

	}

	
	
	/**
	 * get all coupons by type
	 * 
	 * @param request
	 * @param type
	 * @return coupons 
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/getcouponsbytype/{type}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCouponsByType(HttpServletRequest request,@PathVariable("type") CouponType type) throws CouponSystemException {
		Collection<Coupon> coupons = new ArrayList<>();

			CompanyFacade companyFacade = getFacade(request);
			coupons = companyFacade.getAllCouponsByType(type);
			return coupons;

	}

	/**
	 * get all coupons by price 
	 * 
	 * @param request
	 * @param price
	 * @return coupons
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/getcouponsbyprice/{coupoPrice}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCouponsByPrice(HttpServletRequest request,@PathVariable("coupoPrice") double price) throws CouponSystemException {
		Collection<Coupon> coupons = new ArrayList<>();

			CompanyFacade companyFacade = getFacade(request);
			coupons=companyFacade.getAllCouponsByPrice(price);
			return coupons;


	}
	
	/**
	 * get all coupons by end date
	 * 
	 * @param request
	 * @param date
	 * @return coupon
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "company/getcouponsbyenddate/{endDate}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCouponsBeforeEndDate(HttpServletRequest request,@PathVariable("endDate") Date date) throws CouponSystemException{
		System.out.println(date);
		Collection<Coupon> coupons = new ArrayList<>();

			CompanyFacade companyFacade = getFacade(request);
			coupons=companyFacade.getAllCouponsBeforeEndDate(date);
			return coupons;

	}

}
