### android唤醒屏幕


###### 一、为什么要写这篇文章

* 在做RN的时候 遇到一个需求，需要在收到极光推送的时候 点亮屏幕把应用弹出来，所以通过google使用了以下方法


###### 二、如何使用

* 

```javascript
        import android.os.PowerManager;  
        import android.os.PowerManager.WakeLock;  
        import android.app.KeyguardManager;
        import android.app.KeyguardManager.KeyguardLock;
        import android.app.ActivityManager;
        import android.content.ComponentName;
        /**
         * 唤醒手机屏幕并解锁
         */
        public static void wakeUpAndUnlock(Context context) {
            // 获取电源管理器对象
            PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
            boolean screenOn = pm.isScreenOn();
            if (!screenOn) {
                // 获取PowerManager.WakeLock对象,后面的参数|表示同时传入两个值,最后的是LogCat里用的Tag
                PowerManager.WakeLock wl = pm.newWakeLock(
                        PowerManager.ACQUIRE_CAUSES_WAKEUP |
                                PowerManager.SCREEN_BRIGHT_WAKE_LOCK, "bright");
                wl.acquire(10000); // 点亮屏幕
                wl.release(); // 释放
            }
            // 屏幕解锁
            KeyguardManager keyguardManager = (KeyguardManager) context.getSystemService(context.KEYGUARD_SERVICE);
            KeyguardManager.KeyguardLock keyguardLock = keyguardManager.newKeyguardLock("unLock");
            // 屏幕锁定
            keyguardLock.reenableKeyguard();
            keyguardLock.disableKeyguard(); // 解锁

             if (!isTopActivity(context)) {
                // 唤醒App
                Intent intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                context.startActivity(intent);
            }
        }

        // 判断应用是不是已经在最上层了
        private static boolean isTopActivity(Context context){
            boolean isTop = false;
            ActivityManager am = (ActivityManager) context.getSystemService(context.ACTIVITY_SERVICE);
            ComponentName cn = am.getRunningTasks(1).get(0).topActivity;
            if (cn.getClassName().contains(TAG))
            {
                isTop = true;
            }
            return isTop;
        }
```


  

###### 三、注意的问题

* 需要判断应用是不是已经在最上层，不然会重复打开闪屏
* 手机需要没有密码或指纹
* 该方法各个手机兼容性没有过多的测试
