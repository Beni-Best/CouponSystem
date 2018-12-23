package com.example.demo;



import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import coupon.sys.core.beans.Company;
import coupon.sys.core.beans.Customer;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.AdminFacade;
import coupon.sys.core.facade.CompanyFacade;
import coupon.sys.core.facade.CustomerFacade;
import coupon.sys.core.system.ClientType;
import coupon.sys.core.system.CouponSystem;


@RestController
@CrossOrigin("*")
public class AdminWS {



	/**
	 * returns facade
	 * 
	 * @param request
	 * @return Facede 
	 * @throws CouponSystemException
	 */
	private AdminFacade getFacade(HttpServletRequest request) throws CouponSystemException  {

//		String username = "admin";
//		String password = "1234";
//
//		CouponSystem cs = CouponSystem.getInstance();
//		AdminFacade admFac;
//
//			admFac = (AdminFacade)cs.login(username, password, ClientType.ADMIN);
//
//		return admFac;
		
		AdminFacade admFac = (AdminFacade)request.getSession().getAttribute("facade");
		return admFac;
		
	}
	/**
	 * This method closes the session
	 * @param request
	 */
	@RequestMapping(value= "admin/logout" , method=RequestMethod.GET , produces = MediaType.APPLICATION_JSON_VALUE)
	public void logout (HttpServletRequest request){
		HttpSession session =request.getSession(false);
		if (request.isRequestedSessionIdValid() && session!=null) {
			session.invalidate();
		}
	}

	/**
	 * This method creates company in database
	 * 
	 * @param request
	 * @param comp
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/createcompany", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createCompany(HttpServletRequest request,@RequestBody Company comp) throws CouponSystemException {
try {
	AdminFacade adminFacade = getFacade(request);
	adminFacade.createCompany(comp);
	return ResponseEntity.status(HttpStatus.ACCEPTED).body(comp.toString());
} catch (Exception e) {
	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
}
			
	}

	/**
	 * This method creates customer in database
	 * 
	 * @param request
	 * @param cust
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/createcustomer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createCustomer(HttpServletRequest request, @RequestBody Customer cust) throws CouponSystemException {
	
	try {
		AdminFacade adminFacade = getFacade(request);
		adminFacade.createCustomer(cust);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(cust.toString());
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
		
	}



	/**
	 * This method updates company in database
	 * 
	 * @param request
	 * @param comp
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/updatecompany", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updateCompany(HttpServletRequest request,@RequestBody Company comp) throws CouponSystemException {
		try {
			AdminFacade adminFacade = getFacade(request);
			adminFacade.updateCompany(comp);
			return ResponseEntity.status(HttpStatus.OK).body(comp.toString());
		} catch (CouponSystemException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	/**
	 * This method updates customer in database
	 * 
	 * @param request
	 * @param cust
	 * @return relevant status
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/updatecustomer", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<String> updateCustomer(HttpServletRequest request,@RequestBody Customer cust) throws CouponSystemException {
	try {
		AdminFacade adminFacade = getFacade(request);
		adminFacade.updateCustomer(cust);
		return ResponseEntity.status(HttpStatus.OK).body(cust.toString());
	} catch (CouponSystemException e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
				
		}



	/**
	 * 
	 * @param request
	 * @return all companies from database
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/getallcompanies", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Company> getAllCompanies(HttpServletRequest request) throws CouponSystemException {
		Collection<Company> comps = new ArrayList<>();
//		try {
			AdminFacade adminFacade = getFacade(request);
			comps = adminFacade.getAllCompanies();
//		} catch (CouponSystemException e) {
//			throw new CouponSystemException("get All Companies WS error");
//		}
		return comps;
	}

	/**
	 * 
	 * @param request
	 * @param compName
	 * @return company by name 
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/getcompanybyname/{compName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCompanyByName(HttpServletRequest request,@PathVariable("compName") String compName) throws CouponSystemException {

		try {
			Company comp = new Company();
			AdminFacade adminFacade = getFacade(request);
			comp = adminFacade.getCompany(compName);
			return ResponseEntity.status(HttpStatus.OK).body(comp);
		} catch (CouponSystemException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
			


	}
	
	/**
	 * 
	 * @param request
	 * @return all customers from database
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/getallcustomer", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Customer> getAllCustomer(HttpServletRequest request) throws CouponSystemException {
		Collection<Customer> custs = new ArrayList<>();
//		try {
			AdminFacade adminFacade = getFacade(request);
			custs = adminFacade.getAllCustomer();
//		} catch (CouponSystemException e) {
//			throw new CouponSystemException("get all customers error");
//		}
		return custs;

	}

	/**
	 * method deletes company by id . if company id==0 it will remove company by name 
	 * 
	 * @param request
	 * @param comp
	 * @return
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/removecompany", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removeCompany(HttpServletRequest request,@RequestBody Company comp) throws CouponSystemException {
	try {
		AdminFacade adminFacade = getFacade(request);
		if (comp.getId()==0) {			
			adminFacade.removeCompany(comp);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(comp.toString());
		}else {
			adminFacade.removeCompany(adminFacade.getCompany(comp.getId()));
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(comp.toString());
		}
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	
	}


	/**
	 *  method deletes customer by id . if customer id==0 it will remove company by name
	 * 
	 * @param request
	 * @param cust
	 * @return
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/removecustomer", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removeCustomer(HttpServletRequest request,@RequestBody Customer cust) throws CouponSystemException {
		try {
			//Check if body's id==0 , if it's id==0 method will remove customer by name, otherwise it will remove customer by id
			AdminFacade adminFacade = getFacade(request);
			if (cust.getId()==0) {			
				adminFacade.removeCustomer(cust);
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(cust.toString());
			}else {
				adminFacade.removeCustomer(adminFacade.getCustomer(cust.getId()));
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(cust.toString());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		

	}
	
	/**
	 * remove customer by id 
	 * 
	 * @param request
	 * @param custId
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/removecustomerbyid/{id}", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void removeCustomerById(HttpServletRequest request,@PathVariable("id") long custId) throws CouponSystemException {
		
			AdminFacade adminFacade = getFacade(request);
			adminFacade.removeCustomer(adminFacade.getCustomer(custId));

	}
	

	/**
	 * 
	 * 
	 * @param request
	 * @param compId
	 * @return all customers that purchased coupons of that company by company id 
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/getallcustomerbycompany/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Customer>getAllCustomerByComp(HttpServletRequest request,@PathVariable("id")int compId) throws CouponSystemException {
		Collection<Customer>customers= new ArrayList<>();
//		try {
			AdminFacade adminFacade = getFacade(request);
			customers=adminFacade.getAllCustomer(adminFacade.getCompany(compId));
//		} catch (CouponSystemException e) {
//			throw new CouponSystemException("get allcustomer by company error");
//		}
		return customers;
	}
	
	/**
	 * 
	 * @param request
	 * @param compId
	 * @return company by id
	 * @throws CouponSystemException
	 */
	@RequestMapping(value = "admin/getcompany/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<?> getCompany(HttpServletRequest request, @PathVariable("id") int compId) throws CouponSystemException {
	try {
		Company comp = new Company();
		AdminFacade adminFacade = getFacade(request);
		comp = adminFacade.getCompany(compId);
		return ResponseEntity.status(HttpStatus.OK).body(comp);
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
			
	
	
		}



	@RequestMapping(value = "admin/getcustomer/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCustomer(HttpServletRequest request, @PathVariable("id") int custId) throws CouponSystemException{
		Customer customer = new Customer();
		try {
			AdminFacade adminFacade = getFacade(request);
			customer=adminFacade.getCustomer(custId);
			return ResponseEntity.status(HttpStatus.OK).body(customer);
		} catch (CouponSystemException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
	
		
	}
	
	@RequestMapping(value = "admin/getcustomerbyname/{name}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCustomerByName(HttpServletRequest request,@PathVariable("name") String custName) throws CouponSystemException{
		Customer customer = new Customer();
		try {
			AdminFacade adminFacade = getFacade(request);
			customer=adminFacade.getCustomer(custName);
			return ResponseEntity.status(HttpStatus.OK).body(customer);
		} catch (CouponSystemException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
	
		
	}
}
