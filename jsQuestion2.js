let obj={
    _setVersion:function(versionName){
      this._version=versionName;
    },
    _setChannel: function(channelName){
      this._channel=channelName;
    },
    _setkeyField:function(feildName){
      this._keyField=feildName;
    },
    getVesion: function()
    {
      console.log(this._version);
    },
    getChannel: function()
    {
      console.log(this._channel);
    },
    getkeyField: function()
    {
      console.log(this._keyField);
    }
  }
  obj._setVersion('1.0');
  obj._setkeyField(36);
  obj.getkeyField();
  obj.getVesion();  
  
  let newObj= [{'channel': 'A'}, {'channel': 'B'}, {'channel':'C'}];
  
  obj.getkeyField.prototype.arrMethod = (newObj) => {
    let arr=[];
    for(let i = 0; i < newObj.length; i++){
      arr.push(newObj[i].channel);
    }
    console.log(arr);
  }
  obj.getkeyField.prototype.arrMethod(newObj);
  