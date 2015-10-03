
## TODOs
+ Set up React native (iOS for a start)

+ First interface for the app 
  - [UI] List with icon + text 
  - [UI] Tapping sets one of the 3 states red (0%) -> yellow (50%) -> green (100%)
  - [UI] (optional) Swipping changes color accordingly (and sets the level)
  - [REST] Send sth to the server: /item-name/percentage-state

+ Server API (node)
  - Api with following routes:
	- create user (npm passport)
	- login user
	- create group + invite people to it
	- create or update/edit item with state, new name etc, delete item
    - get items filtered by state

  - Mongo db
  ```
  Schema: groups : {
      groupId: '', // @unique, @indexed
      name: '',
      participants: [], // referenced by _id
      items: [{
		itemId: '',
		name: '',
  	    icon: '', // public url 
		state: ''	
	  }]
  } 
	members: {
	  id: '',
	  name: '',
	  email: '',
	  groups: [], // in which they are members by _id
	  photo: '', // public url
	  currentLocation: ''
	}
  ```
+ Authentication
  - [UI] Register/Login screen for users 
  - [UI] Creating groups (inviting people to your group)
  - [REST] Send appropriate stuff to back-end

+ Background task tracks if position moved sufficiently enough to setup new fences
  - Setting up fences includes querrying for stores: google places api
  - If you cross fench call our api to get list of missing items -> update the app
	- and show a local notification to the user

+ Hardware stuff for the fridge
