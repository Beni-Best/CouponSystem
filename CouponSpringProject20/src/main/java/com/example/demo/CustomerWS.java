package com.example.demo;

import java.io.Console;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import coupon.sys.core.beans.Coupon;
import coupon.sys.core.beans.CouponType;
import coupon.sys.core.beans.Customer;
import coupon.sys.core.dao.db.CustomerDaoDb;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.CompanyFacade;
import coupon.sys.core.facade.CustomerFacade;
import coupon.sys.core.system.ClientType;
import coupon.sys.core.system.CouponSystem;

@RestController
@CrossOrigin("*")
public class CustomerWS {


	private CustomerFacade getFacade(HttpServletRequest request) throws CouponSystemException  {
		
		
//		String username = "maxim";
//		String password = "max5555";
//
//		CouponSystem cs = CouponSystem.getInstance();
//		CustomerFacade custFac;
//
//			custFac = (CustomerFacade)cs.login(username, password, ClientType.CUSTOMER);
//
//		return custFac;
	
		CustomerFacade cf = (CustomerFacade)request.getSession().getAttribute("facade");
		return cf;

	}
	
	@RequestMapping (value="/customer/getallcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCoupons(HttpServletRequest request) throws CouponSystemException{
		Collection<Coupon> coupons = new ArrayList<>();
			CustomerFacade custFac = getFacade(request);
			coupons = custFac.getAllCoupons();
			return coupons;		
	}
	
	
	@RequestMapping (value="/customer/getallpurchasedcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllPurchasedCoupons(HttpServletRequest request) throws CouponSystemException{
		Collection<Coupon> coupons = new ArrayList<>();
			CustomerFacade custFac = getFacade(request);
			coupons = custFac.getAllPurchasedCoupons();

		return coupons;
	}
	
	@RequestMapping (value="/customer/getallpurchasedcouponsbytype/{coupType}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllPurchasedCouponsByType(HttpServletRequest request, @PathVariable("coupType") CouponType coupType) throws CouponSystemException{
		Collection<Coupon> coupons = new ArrayList<>();
			CustomerFacade custFac = getFacade( request);
			coupons = custFac.getAllPurchasedCouponsByType(coupType);
		return coupons;
	}
	
	@RequestMapping (value="/customer/getallpurchasedcouponsbyprice/{price}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllPurchasedCouponsByPrice(HttpServletRequest request, @PathVariable("price")Double price) throws CouponSystemException{
		Collection<Coupon> coupons = new ArrayList<>();
	
			CustomerFacade custFac = getFacade( request);
			coupons = custFac.getAllPurchasedCouponsByPrice(price);
	
		return coupons;
	}

	@RequestMapping (value="/customer/getallcouponsbytype/{coupType}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCouponsByType(HttpServletRequest request, @PathVariable("coupType") CouponType coupType) throws CouponSystemException{
		Collection<Coupon> coupons = new ArrayList<>();
			CustomerFacade custFac = getFacade( request);
			coupons = custFac.getAllCouponsByType(coupType);
		return coupons;
	}
		
	@RequestMapping (value="/customer/getallcouponsbyprice/{price}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Coupon> getAllCouponsByPrice(HttpServletRequest request,@PathVariable("price")Double price) throws CouponSystemException{
		Collection<Coupon> coupons = new ArrayList<>();

			CustomerFacade custFac = getFacade( request);
			coupons = custFac.getAllCouponsByPrice(price);

		return coupons;
	}
	
	
	@RequestMapping (value="/customer/purchasecoupon", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public  ResponseEntity<String> purchaseCoupon(HttpServletRequest request,@RequestBody Coupon coup) throws CouponSystemException{
		
	try {
		CustomerFacade customerFacade = getFacade( request);
		customerFacade.purchaseCoupon(coup);
		return ResponseEntity.status(HttpStatus.OK).body(coup.toString());
	} catch (CouponSystemException e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
			
	
	}
	
	
}
