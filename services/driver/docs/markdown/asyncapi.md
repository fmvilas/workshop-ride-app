# Driver API 1.0.0 documentation





## Table of Contents



* [Servers](#servers)


* [Channels](#channels)





<a name="servers"></a>
## Servers

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>Protocol</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>tcp://localhost:9092</td>
      <td>kafka</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="3">
        <details>
          <summary>URL Variables</summary>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Default value</th>
                <th>Possible values</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              </tbody>
          </table>
        </details>
      </td>
    </tr>
    <tr>
      <td>tcp://velomobile-01.srvs.cloudkafka.com:9094</td>
      <td>kafka</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="3">
        <details>
          <summary>URL Variables</summary>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Default value</th>
                <th>Possible values</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              </tbody>
          </table>
        </details>
      </td>
    </tr>
    </tbody>
</table>






## Channels



<a name="channel-ride/requested"></a>





#### Channel Parameters







###  `publish` ride/requested

#### Message








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>user </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>user.id </td>
  <td>string</td>
  <td><p>Id of the user.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>user.fullName </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>ride </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>ride.id </td>
  <td>string</td>
  <td><p>Id of the user.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.from </td>
  <td>object</td>
  <td><p>Position where the ride starts from.</p>
</td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>ride.from.latitude </td>
  <td>number</td>
  <td><p>Latitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.from.longitude </td>
  <td>number</td>
  <td><p>Longitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.from.friendlyName </td>
  <td>string</td>
  <td><p>Human-friendly name of the location.</p>
</td>
  <td><em>Any</em></td>
</tr>













<tr>
  <td>ride.to </td>
  <td>object</td>
  <td><p>Position where the ride finishes.</p>
</td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>ride.to.latitude </td>
  <td>number</td>
  <td><p>Latitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.to.longitude </td>
  <td>number</td>
  <td><p>Longitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.to.friendlyName </td>
  <td>string</td>
  <td><p>Human-friendly name of the location.</p>
</td>
  <td><em>Any</em></td>
</tr>













<tr>
  <td>ride.price </td>
  <td>number</td>
  <td><p>Price of the ride in Euros.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>sentAt </td>
  <td>string</td>
  <td><p>Date and time when the message was sent.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "user": {
    "id": "string",
    "fullName": "string"
  },
  "ride": {
    "id": "string",
    "from": {
      "latitude": -90,
      "longitude": -180,
      "friendlyName": "string"
    },
    "to": {
      "latitude": -90,
      "longitude": -180,
      "friendlyName": "string"
    },
    "price": 0
  },
  "sentAt": "2019-10-07T12:17:05Z"
}
```








<a name="channel-ride/assigned"></a>





#### Channel Parameters







###  `publish` ride/assigned

#### Message








##### Payload




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
    
      
<tr>
  <td>user </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>user.id </td>
  <td>string</td>
  <td><p>Id of the user.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>user.fullName </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>driver </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>driver.id </td>
  <td>string</td>
  <td><p>Id of the driver.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>driver.fullName </td>
  <td>string</td>
  <td></td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>ride </td>
  <td>object</td>
  <td></td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>ride.id </td>
  <td>string</td>
  <td><p>Id of the user.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.from </td>
  <td>object</td>
  <td><p>Position where the ride starts from.</p>
</td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>ride.from.latitude </td>
  <td>number</td>
  <td><p>Latitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.from.longitude </td>
  <td>number</td>
  <td><p>Longitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.from.friendlyName </td>
  <td>string</td>
  <td><p>Human-friendly name of the location.</p>
</td>
  <td><em>Any</em></td>
</tr>













<tr>
  <td>ride.to </td>
  <td>object</td>
  <td><p>Position where the ride finishes.</p>
</td>
  <td><em>Any</em></td>
</tr>





<tr>
  <td>ride.to.latitude </td>
  <td>number</td>
  <td><p>Latitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.to.longitude </td>
  <td>number</td>
  <td><p>Longitude of the starting point.</p>
</td>
  <td><em>Any</em></td>
</tr>









<tr>
  <td>ride.to.friendlyName </td>
  <td>string</td>
  <td><p>Human-friendly name of the location.</p>
</td>
  <td><em>Any</em></td>
</tr>













<tr>
  <td>ride.price </td>
  <td>number</td>
  <td><p>Price of the ride in Euros.</p>
</td>
  <td><em>Any</em></td>
</tr>











    
      
<tr>
  <td>sentAt </td>
  <td>string</td>
  <td><p>Date and time when the message was sent.</p>
</td>
  <td><em>Any</em></td>
</tr>







    
  </tbody>
</table>



###### Example of payload _(generated)_

```json
{
  "user": {
    "id": "string",
    "fullName": "string"
  },
  "driver": {
    "id": "string",
    "fullName": "string"
  },
  "ride": {
    "id": "string",
    "from": {
      "latitude": -90,
      "longitude": -180,
      "friendlyName": "string"
    },
    "to": {
      "latitude": -90,
      "longitude": -180,
      "friendlyName": "string"
    },
    "price": 0
  },
  "sentAt": "2019-10-07T12:17:05Z"
}
```










